"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("mysql"));
//mysql://b137fcb21060c1:23775740@us-cdbr-iron-east-03.cleardb.net/heroku_0f4dce64d018dc1?reconnect=true
//latest //mysql://b871d25f0d99c4:543189c3@us-cdbr-iron-east-03.cleardb.net/heroku_f2ca4e2afb9f6c6?reconnect=true
const pool = mysql.createPool({
    host: "us-cdbr-iron-east-03.cleardb.net",
    user: "b871d25f0d99c4",
    password: "543189c3",
    database: "heroku_f2ca4e2afb9f6c6"
});
pool.getConnection(function (err, con) {
    if (!!err) {
        con.release();
        console.log(err);
    }
});
exports.default = pool;
//# sourceMappingURL=db.js.map