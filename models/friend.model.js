import db from '../db/mysql.js'

const friendTable = `
    create table video_like(
        id int not null primary key auto_increment,
        user_id1 int not null,
        user_id2 int not null,
        status int not null,
        create_time timestamp default current_timestamp
    )
`