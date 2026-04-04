import Redis from "ioredis";

const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
    lazyConnect: false
});
redis.on("connect", () => {
    console.log("✅ Redis connected");
});

redis.on("error", (err) => {
    console.error("❌ Redis error:", err);
});

export default redis;


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// wsl  -> {[open wsl terminal]}
// sudo apt update
// sudo apt install redis-server -y
// sudo service redis-server start
