const mongoose = require("mongoose");
const redis = require("redis");
const ulti = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
const exec = mongoose.Query.prototype.exec;

client.hget = ulti.promisify(client.hget);

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCached = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCached) return exec.apply(this, arguments);
  const key = JSON.stringify({
    ...this.getQuery(),
    ...{
      collection: this.mongooseCollection.name
    }
  });

  //Have a value for 'key' in redis store
  const cachedValue = await client.hget(this.hashKey, key);
  //if true => return that
  if (cachedValue) {
    console.log("Cached in redis");
    const doc = JSON.parse(cachedValue);
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }
  //otherwise, issue  the query and store the result in redis
  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, 60);
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
