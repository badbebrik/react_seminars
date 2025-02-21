import {Request, Response} from "express";
import axios from "axios";
import { Post } from "../models/Post";

export async function getById(req: Request, res: Response) {
    const id = req.params["id"];
    try {
        const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const data = response.data
        res.json(data);
    } catch {
        res.sendStatus(500);
    }
}