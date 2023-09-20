FROM oven/bun:1.0

CMD ["bun", "start"]
ENV NODE_ENV=production
EXPOSE 9753
USER bun
WORKDIR /usr/src/app

COPY --chown=bun:bun ./package*.json .
COPY --chown=bun:bun ./bun.lockb .

COPY --chown=bun:bun . .

RUN bun install
