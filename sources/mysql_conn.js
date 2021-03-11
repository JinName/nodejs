class mysql_conn {
    constructor() {
        this.mysql = require('mysql');
        this.conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'tmddnjs2@1324',
            database: 'user_info'
        });
    }

    connect(){
        this.conn.connect();
    }

    disconnect(){
        this.conn.end();
    }

    query(_query){
        return this.conn.query(_query, function(error, rows, fields){
            return rows;
        });
    }
}