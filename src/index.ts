import express from 'express';
import snowflake from 'snowflake-sdk';

const app = express();
const port = 3000;  // ポート番号は必要に応じて変更

// Snowflake 接続の設定
const connection = snowflake.createConnection({
    account: 'gb14004.west-us-2.azure',
    username: 'yutaokazaki',
    password: 'Isidsnowflake2021',
    warehouse: 'compute_wh',
    database: 'analytics',
    schema: 'customer'
});

// Snowflake への接続
connection.connect((err, conn) => {
    if (err) {
        console.error('Snowflake connection error: ', err);
        return;
    }
    console.log('Successfully connected to Snowflake.');
    // 接続が成功した後のロジック
});

// エンドポイントの設定
app.get('/data', (req, res) => {
    connection.execute({
        sqlText: 'SELECT * FROM sites LIMIT 10',
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Failed to execute query: ', err);
                res.status(500).send('Failed to retrieve data');
                return;
            }
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
