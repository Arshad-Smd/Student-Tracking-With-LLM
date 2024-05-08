import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import connect from './conn.js';
import form from './mongo.js';
import { admin , user } from './mongo.js';


const app = express();

const url = "mongodb://localhost:27017";
app.use(morgan('tiny'));
app.use(cors())

app.use(express.json());
const port = 8001;
connect().then(() => {
    try{
        app.listen(port, () => {
            console.log(`Server connected to http:localhost:${port}`);
        })} catch (error){
            console.log("Cannot connected to the server");
        }})
  .catch(err => {
    console.log(err)
})

app.get('/userreg', async (req, res) => {
    try {
        let {id , password} = req.query;
        console.log(req.query);
        const form = new user(
            {
                id,
                password
            }
        )
        await form.save();
        res.send("data saved successfully")
    }
    catch (err) {
        res.send(err);
    }
})

app.get('/userreg', async (req, res) => {
    try {
        let {id , password} = req.query;
        console.log(req.query);
        const form = new admin(
            {
                id,
                password
            }
        )
        await form.save();
        res.send("data saved successfully")
    }
    catch (err) {
        res.send(err);
    }
})

app.get("/adminlogin", async (req, res) => {
    try {
        const { id, password } = req.query;
        // Find the admin document by both id and password
        console.log(req.query)
        const user = await admin.findOne({ id:id, password : password });
        // res.send(user);
        console.log(user)
        if (user) {
            res.send("success");
        } else {
            res.send("Data not found");
        }
    } catch (err) {
        res.send(err);
    }
});
app.get("/userlogin", async (req, res) => {
    try {
        const { id, password } = req.query;
        console.log(req.query)
        const us = await user.findOne({ id:id, password : password });
        console.log(us)
        if (us) {
            res.send("success");
        } else {
            res.send("Data not found");
        }
    } catch (err) {
        res.send(err);
    }
});






app.post('/form', async (req, res) => {
    try {
        let leetcodeCount = 0;
        let codechefRating = 0;
        const { name, rollno, branch, year, cgpa, attendance,leetcode , codechef,codeforce, skills, expertise, certificates, projects, awards, papers } = req.body;

        const formData = new form({
            name,
            rollno,
            branch,
            year,
            cgpa,
            attendance,
            leetcode,
            codechef,
            leetcodeCount,
            codechefRating,
            codeforce,
            skills,
            expertise,
            certificates,
            projects,
            awards,
            papers
        });
        console.log(formData);
        await formData.save();

        res.send("Data saved successfully");
    } catch (err) {
        
        if (err.code === 11000) {
            res.status(400).send("Duplicate email");
        } else {
            res.status(500).send("Internal server error");
        }
    }
});
app.get('/custom', async (req, res) => {
    try {
        console.log(req.query);
        const query = req.query.query;
        console.log(query);
        const resquery = await JSON.parse(query);
        const formData = await form.find(resquery);

        if (formData.length > 0) {
            res.json(formData);
        } else {
            res.status(404).json({ error: 'No data found for the provided query' });
        }
    } catch (error) {
        console.error('Error retrieving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/form', async (req, res) => {
    try {
        const rollno = req.query.rollno;

        if (!rollno) {
            return res.status(400).json({ error: 'Roll number is required' });
        }

        const formData = await form.findOne({ rollno });
        if (formData) {
            res.json(formData);
        } else {
            res.status(404).json({ error: 'Data not found' });
        }
    } catch (error) {

        console.error('Error retrieving form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/formupdate', async (req, res) => {
    try {
        // const rollno = req.query.rollno;
        const { leetcodeCount, codechefRating , rollno } = req.body;
        console.log(req.body);
        if (!rollno) {
            return res.status(400).json({ error: 'Roll number is required' });
        }

        if (!leetcodeCount && !codechefRating) {
            return res.status(400).json({ error: 'At least one field (leetcodeCount or codechefRating) is required for update' });
        }
        console.log(rollno);

        const formData = await form.findOne({ rollno });

        if (!formData) {
            return res.status(404).json({ error: 'Data not found' });
        }

        if (leetcodeCount) {
            formData.leetcodeCount = leetcodeCount;
        }

        if (codechefRating) {
            formData.codechefRating = codechefRating;
        }

        await formData.save();

        res.json({ message: 'Data updated successfully', formData });
    } catch (error) {
        console.error('Error updating form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put('/form', async (req, res) => {
    try {
        const rollno = req.query.rollno;
        const updateData = req.body;

        if (!rollno) {
            return res.status(400).json({ error: 'Roll number is required' });
        }

        const updatedForm = await form.findOneAndUpdate({ rollno }, updateData, { new: true });

        if (updatedForm) {
            res.json(updatedForm);
        } else {
            res.status(404).json({ error: 'Data not found' });
        }
    } catch (error) {

        console.error('Error updating form data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});






