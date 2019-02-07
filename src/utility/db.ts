
import * as mysql from 'mysql';

//mysql://b137fcb21060c1:23775740@us-cdbr-iron-east-03.cleardb.net/heroku_0f4dce64d018dc1?reconnect=true
//latest //mysql://b871d25f0d99c4:543189c3@us-cdbr-iron-east-03.cleardb.net/heroku_f2ca4e2afb9f6c6?reconnect=true
const pool = mysql.createPool({
        host:"us-cdbr-iron-east-03.cleardb.net",
        user:"b871d25f0d99c4",
        password:"543189c3",
        database:"heroku_f2ca4e2afb9f6c6"
});

pool.getConnection(function(err, con){
        if (!!err) {
            con.release();
            console.log(err);
        }
    });

export default pool;