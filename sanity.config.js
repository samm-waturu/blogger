import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const config = {

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: false
    // set to `true` to fetch from edge cache
    // use current date (YYYY-MM-DD) to target the latest API version
    // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
}

const builder = imageUrlBuilder(config)
export const urlFor = (source) => {return builder.image(source)}
export const GroQL = createClient(config)

