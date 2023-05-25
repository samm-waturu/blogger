import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'cms-blog',
  projectId: 'jmwiovf0',
  dataset: 'production',

  plugins: [deskTool(undefined), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
