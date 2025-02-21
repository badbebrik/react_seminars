import axios from 'axios'
import { Request, Response } from 'express'
import { Post } from '../models/Post';

export async function getAll(req: Request, res: Response)  {
    try {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.sendStatus(500);
    }
    
}