import { mutation } from "./_generated/server";
import {v} from "convex/values";

export const CreateNewUser=mutation({
    args: {
        name:v.string(),
        email:v.string(),
        picture:v.optional(v.string())
    },
    handler:async(ctx,args)=>{
        // if user already exist?
        const userData=await ctx.db.query('users')
            .filter(q=>q.eq(q.field('email'),args.email))
            .collect();
        // if Not, then will insert new user
        if(userData?.length==0)
        {
            const insertData = {
                name:args.name,
                email:args.email
            };
            if(args.picture) {
                insertData.picture = args.picture;
            }
            const result=await ctx.db.insert('users', insertData);
            return result;
        }
        return userData[0];
        
    }
})