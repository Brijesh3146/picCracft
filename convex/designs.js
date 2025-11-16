import {v} from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewDesign=mutation({
    args:{
        name:v.string(),
        width:v.number(),
        height:v.number(),
        uid:v.id('users'),

    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.insert('designs',{
            name:args.name,
            height:args.height,
            width:args.width,
            uid:args.uid
        })
        return result;
    }
})

export const GetDesign=query({
    args:{
        id:v.id('designs')
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.get(args.id);
        return result;
    }
})

export const SaveDesign=mutation({
    args: {
        id:v.id('designs'),
        jsonDesign:v.any(),
        imagePreview:v.optional(v.string())
    },
    handler: async(ctx, args) => {
        const result=await ctx.db.patch(args.id,{
            jsonTemplate:args.jsonDesign,
            imagePreview:args?.imagePreview
        })
        return result;
    }
})

export const GetUserDesigns = query({
    args: {
        uid: v.id('users')
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('designs')
        .filter(q => q.eq(q.field('uid'), args.uid))
        .collect();

        return result;
    }
})

export const CreateDesignFromTemplate=mutation({
    args:{
        name:v.string(),
        imagePreview:v.optional(v.string()),
        jsonTemplate:v.any(),
        uid:v.id('users'),
        width:v.number(),
        height:v.number(),
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.insert('designs',{
            name:args.name,
            uid:args.uid,
            height:args.height,
            width:args.width,
            imagePreview:args?.imagePreview,
            jsonTemplate:args.jsonTemplate
        });

        return result
    }
})