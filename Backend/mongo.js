const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://vridhi:merrychristmas@cluster0.t9arlgd.mongodb.net/student';

const getStudentT1deets = async(req, res, next)=>
{
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db('student');
        const student = await db.collection("Mltestones").find((st) => {
            //return st."roll no" === req.body.rno;
        });
    } catch (error) {
        return res.json({message: 'Could not get the T1 details of student.'})
    }
}