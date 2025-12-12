# ติดตั้ง Node.js 20 เฉพาะสำหรับ Alpine Linux (Base Image)
FROM node:20-alpine AS base

# ติดตั้ง dependencies เฉพาะที่จำเป็นเท่านั้น (Install Dependencies)
# ใช้เพื่อแคช dependencies ถ้าไม่มีการเปลี่ยนแปลง package.json
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# สร้าง Source Code ใหม่เพื่อเตรียมใช้งาน (Build Source Code)
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# สร้าง Image สำหรับ Production (Production Image)
# คัดลอกเฉพาะไฟล์ที่จำเป็นและรัน Next.js เพื่อลดขนาด Image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
