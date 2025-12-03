# 1. Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files เพื่อ install dependencies ก่อน (ช่วยเรื่อง caching)
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# สร้าง Production Build
# ถ้าใช้ environment variables ในการ build ให้เพิ่มตรงนี้ด้วย (เช่น ENV NEXT_PUBLIC_API_URL=...)
RUN npm run build

# 3. Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# ปิด Next.js Telemetry (เก็บข้อมูลการใช้งาน) ถ้าต้องการ
# ENV NEXT_TELEMETRY_DISABLED 1

# สร้าง User ใหม่เพื่อความปลอดภัย (ไม่รันด้วย root)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public folder (รูปภาพ, assets)
COPY --from=builder /app/public ./public

# Copy ไฟล์ที่จำเป็นสำหรับ Standalone mode
# โฟลเดอร์ .next/standalone จะถูกสร้างขึ้นมาตอนสั่ง npm run build (ถ้าตั้งค่า next.config.js แล้ว)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# รันด้วย node server.js (โหมด standalone ไม่ต้องใช้ npm start)
CMD ["node", "server.js"]