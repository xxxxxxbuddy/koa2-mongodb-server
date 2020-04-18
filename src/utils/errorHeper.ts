import { NativeError } from 'mongoose';
import { RESPONSE_TAG } from '../constant';

export interface MongoError {
    code: number;
    errmsg: string;
    index: number;
}

export const handleErr = (err: MongoError & NativeError) => {
    let error = '';
    switch (err.code) {
        case 11000: error = 'The primary key has been used.';   break;
    }
    return RESPONSE_TAG.ERROR + (error ? error : err.message);
};