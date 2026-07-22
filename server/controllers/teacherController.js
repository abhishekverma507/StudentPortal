import Teacher from "../models/Teacher.js";


// Get all teachers
export const getTeachers = async (req, res) => {

  try {

    const teachers = await Teacher.find();

    res.status(200).json({
      data: teachers
    });


  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};




// Get teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }

    res.status(200).json({
      data: teacher,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};




// Add teacher
export const addTeacher = async (req, res) => {

  try {

    const teacher = await Teacher.create(
      req.body
    );


    res.status(201).json({

      message:
      "Teacher added successfully",

      teacher

    });


  } catch(error){


    res.status(500).json({

      message:error.message

    });


  }

};




// Update teacher
export const updateTeacher = async (req,res)=>{


  try{


    const teacher =
      await Teacher.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new:true
        }

      );


    if(!teacher){

      return res.status(404).json({

        message:"Teacher not found"

      });

    }


    res.status(200).json({

      message:
      "Teacher updated successfully",

      teacher

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};





// Delete teacher
export const deleteTeacher = async(req,res)=>{


  try{


    const teacher =
      await Teacher.findByIdAndDelete(
        req.params.id
      );



    if(!teacher){

      return res.status(404).json({

        message:"Teacher not found"

      });

    }



    res.status(200).json({

      message:
      "Teacher deleted successfully"

    });



  }catch(error){


    res.status(500).json({

      message:error.message

    });


  }


};