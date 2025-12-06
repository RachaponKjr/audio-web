# Stage 1: Install dependencies
# ใช้ Alpine Linux เพราะขนาดเล็กและไม่มี tool ขยะให้ Hacker ใช้
FROM node:20-alpine AS deps
# ติดตั้ง libc6-compat สำหรับ library บางตัวที่อาจต้องการ
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy เฉพาะไฟล์ package เพื่อ install dependencies ก่อน
COPY package*.json ./
# ใช้ npm ci แทน npm install (แม่นยำกว่าและเร็วกว่า)
RUN npm ci

# --------------------------------------------------------

# Stage 2: Build the app
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ปิด Telemetry ของ Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# สั่ง Build
RUN npm run build

# --------------------------------------------------------

# Stage 3: Production Image (ตัวที่จะรันจริง)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# สร้าง User ใหม่ชื่อ 'nextjs' เพื่อไม่ให้รันเป็น root
# (นี่คือหัวใจสำคัญของการป้องกันการเจาะระบบแบบที่คุณเจอ)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy เฉพาะไฟล์ที่จำเป็นจาก Builder มา (ไฟล์ขยะไม่เอามา)
# Copy โฟลเดอร์ public
COPY --from=builder /app/public ./public

# Copy โฟลเดอร์ .next/standalone (ต้องเปิด output: standalone ใน config ก่อน)
# พร้อมกำหนดสิทธิ์ให้ user 'nextjs' เป็นเจ้าของไฟล์
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# สลับมาใช้ User ธรรมดา (Hacker จะลงโปรแกรมเพิ่มไม่ได้แล้ว)
USER nextjs

EXPOSE 3000

ENV PORT 3000
# ใช้ node server.js โดยตรง ไม่ผ่าน npm เพื่อลด overhead
CMD ["node", "server.js"]