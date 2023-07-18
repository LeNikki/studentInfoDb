import clientPromise from "../../lib/mongodb";

export default async function handler (req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("StudentsDb");
    const collectionName = req.query.collection; 
    switch(req.method){
      case "GET": {
        const studentCPE = await db
          .collection(collectionName)
          .find({})
          .sort({ metacritic: -1 })
          .limit(10)
          .toArray();
          res.status(200).json(studentCPE);
      } break;
      case "POST": {
        const { name, number } = req.body; //the object that we will pus is {name: "SNdjnfjn", number: "34534"}
        const nameExist = await db.collection(collectionName).findOne({ name});
        const numExist = await db.collection(collectionName).findOne({number});
        if (nameExist) {
          // Data exists in the collection
          console.log('Data exists:');
          res.json({ message: 'Error. Student name exists' });
        } 
        else if(numExist){
            // Data exists in the collection
            console.log('Data exists:');
            res.json({ message: 'Error. Student number exists' });
        }
        else if(numExist && nameExist){
          // Data exists in the collection
          console.log('Data exists:');
          res.json({ message: 'Error. Student name and number exists' });
         }
        else {
          // Data does not exist in the collection
          const studentCPE = await db.collection(collectionName).insertOne({name, number});
          res.status(200).json({ data: studentCPE, message: 'Successfully added new student.' });
        }
       
      } break;
      case 'DELETE': {
        const deleteAll = req.query.deleteAll
        if(deleteAll){
          const result = await db.collection(collectionName).deleteMany({});
          if (result.deletedCount >= 1) {
            res.status(200).json({message: "Successfully deleted all document. " + deleteAll});
          } else {
            res.status(200).json({message: "No Data to delete. Empty."});
          }
        }
        else if(!deleteAll){
          const studentId = req.body.idNumber; // Access idNumber from the request body
          const query = { id: studentId }; //in the database we have: {_id, id, name, number}.. we will query the "id"
          const result = await db.collection(collectionName).deleteOne(query);
          if (result.deletedCount === 1) {
            res.status(200).json({message: "Successfully deleted one document. " + deleteAll});
          } else {
            res.status(200).json({message: "No Data to delete. Empty."});
          }
         
        }
        else{
          res.json({message: 'Confused: ' + deleteAll})
        }
       
      } break;
      case "PUT": {
        const { name, number, prevName, prevNum } = req.body;
        
        const query = { $or: [{ name: name }, { number: number }] };
        const existingStudent = await db.collection(collectionName).findOne(query);
        
        if (existingStudent && (existingStudent.name !== prevName || existingStudent.number !== prevNum)) {
          // Data exists in the collection
          console.log('Data exists:');
          res.json({ message: 'Error. Student name and number exist' });
        } else {
          // Data does not exist in the collection or remains unchanged
          const filter = { name: prevName, number: prevNum };
          const updateData = { $set: { name, idNumber: number } };
          const studentCPE = await db.collection(collectionName).updateOne(filter, updateData);
          
          if (studentCPE.matchedCount === 0) {
            // No matching document found to update
            res.json({ message: 'Error. Student data not found' });
          } else {
            // Data updated successfully
            res.status(200).json({ data: studentCPE, message: 'Successfully updated student data.' });
          }
        }
      }
      
    }
  }
  catch (e) {
    console.error(e);
  }
  
}






