import { Client, Databases} from "appwrite"

const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL!)
client.setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)

const databases = new Databases(client)

export { client, databases }
