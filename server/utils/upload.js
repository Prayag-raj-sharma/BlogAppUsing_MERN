import {GridFsStorage} from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = GridFsStorage({
    url: `mongodb://${username}:${password}@ac-1gxyamv-shard-00-00.ebs2jop.mongodb.net:27017,ac-1gxyamv-shard-00-01.ebs2jop.mongodb.net:27017,ac-1gxyamv-shard-00-02.ebs2jop.mongodb.net:27017/?ssl=true&replicaSet=atlas-suuckg-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: {useNewUrlParser: true},
    file: (request,file) => {
        const match = ['image/png', 'image/jpg'];

        if(match.indexOf(file.memeType) === -1) {
             return `${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`

        }
    }
})

export default multer({storage})