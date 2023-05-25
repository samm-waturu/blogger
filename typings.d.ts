import {TypedObject} from "@sanity";

export interface Post {
    _id: string;
    _createdAt: string;
    title: string;
    author: {
        name: string,
        image: string
    }
    comments: [Comment];
    description: string;
    mainImage: {
        assets: {
            url: string
        }
    }
    slug: {
        current: string
    }
    body: [object]
}

export interface slugPost {
    post: {
        post: TypedObject;
        _id: string;
        title: string;
        description: string;
        author: {
            name: string;
            image: string
        }
        mainImage: {
            assets: {
                url: string
            }
        }
        _createdAt: string
        body: [any]
    }
}
export interface Props {
    post: [Post] //post=[];
}

export interface Posts {
    id: string,
    link: string,
    title: string,
    created: string,
    key: string
}