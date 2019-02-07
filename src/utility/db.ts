
import * as mysql from 'mysql';

//mysql://b137fcb21060c1:23775740@us-cdbr-iron-east-03.cleardb.net/heroku_0f4dce64d018dc1?reconnect=true

const pool = mysql.createPool({
        host:"us-cdbr-iron-east-03.cleardb.net",
        user:"b137fcb21060c1",
        password:"23775740",
        database:"heroku_0f4dce64d018dc1"
});

pool.getConnection(function(err, con){
        if (!!err) {
            con.release();
            console.log(err);
        }
    });

export default pool;