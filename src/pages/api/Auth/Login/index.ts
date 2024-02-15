import { NextApiRequest, NextApiResponse } from "next";
import Client from '../../../../models/Client'
import db from "../../../../utils/index.js";
const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'POST') {
            const { user, password, authType } = req.body
            if (authType === '%L&O*G%I&N*') {
                const client = await Client.find({ email: user }) || await Client.find({ phone: user })
                if (client) {
                    
                } else {
                    res.status(402).json({success:false, message:'User Not Found'})
                }
            } else {
                res.status(407).json({success:false, message:'Invalid Auth Type'})
            }
        } else {
            res.status(409).json({success:false, message:'Invalid Method'})
        }
    } catch (err) {
        res.status(500).json({success:false, message:'Server Error' + err})
    }
}
export default Auth