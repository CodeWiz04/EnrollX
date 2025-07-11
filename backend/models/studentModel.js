const { sql, poolPromise } = require("../config/db");

const studentModel = {
  createStudent: async (name, rollNo, email, hashedPassword) => {
    const pool = await poolPromise;
    await pool
      .request()
      .input("rollNo", sql.Char(8), rollNo)
      .input("email", sql.VarChar(50), email)
      .input("password", sql.VarChar(100), hashedPassword)
      .input("name", sql.VarChar(50), name)
      .execute("REGISTER_STUDENT");
  },

  getStudentByRollNo: async (rollNo) => {
    const pool = await poolPromise;
  
    const result = await pool
      .request()
      .input("rollNo", sql.Char(8), rollNo)
      .output("name", sql.VarChar(50))
      .output("email", sql.VarChar(50))
      .output("status", sql.Bit)
      .output("password", sql.VarChar(255))
      .output("current_semester", sql.Int)
      .execute("CHECK_STUDENT");
  
    const { name, email, status, password, current_semester } = result.output;
  
    if (status === true) {
      return { name, email, password, rollNo, currentSemester: current_semester };
    } else {
      return null;
    }
  },
  updatePassword: async (rollNo, newPassword) => {
    const pool = await poolPromise;
    await pool
      .request()
      .input("rollNo", sql.Char(8), rollNo)
      .input("password", sql.VarChar, newPassword)
      .execute("UPDATE_PASSWORD");
  },

  
  getEnrolledCourses: async (rollNo) => {
    const pool = await poolPromise;
    try {
      const result = await pool.request()
        .input("rollNo", sql.Char(8), rollNo || "") 
        .execute('GET_ENROLLED_COURSES');  
      return result.recordset;
    } catch (error) {
      console.error('❌ Error fetching courses:', error);
      throw error;
    }
  },

  getCoursesOffered: async (rollNo) => {
    const pool = await poolPromise;
  
    const result = await pool
      .request()
      .input("rollNo", sql.Char(8), rollNo)
      .execute("GET_COURSES_OFFERED");
    return result.recordset;
  },

  // Helper function to get the registration period
  getRegistrationPeriod: async () => {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        `SELECT * FROM Registration_Period WHERE GETDATE() BETWEEN start_datetime AND end_datetime AND is_active = 1`
      );
    return result.recordset[0];
  },

  // Drop Enrolled Course
  dropCourse: async function (rollNo, courseCode) {
    try {
      const pool = await poolPromise;
  
      const result = await pool
        .request()
        .input("rollNo", sql.Char(8), rollNo)
        .input("courseCode", sql.VarChar(9), courseCode)
        .execute("DROP_ENROLLMENT");
  
      return { message: "✅ Course dropped successfully" };
  
    } catch (error) {
      console.error("❌ Error dropping course:", error);
  
      if (error.message.includes("Student is not enrolled")) {
        return { message: "❌ Student is not enrolled in this course" };
      }
  
      return { message: "❌ Internal Server Error" };
    }
  },
  
  enrollCourse: async (rollNo, courseCode) => {
    try {
      const pool = await poolPromise;
  
      await pool
        .request()
        .input("rollNo", sql.Char(8), rollNo)
        .input("courseCode", sql.VarChar(9), courseCode)
        .execute("ENROLL_STUDENT");
  
      return { message: "Course enrolled successfully" };
    } catch (error) {
      console.error("❌ Error enrolling course:", error);
      return { message: `❌ ${error.originalError?.message || "Internal Server Error"}` };
    }
  },
  getCurrentCreditHours: async (rollNo) => {
    const pool = await poolPromise;
    try {
      const result = await pool
        .request()
        .input("rollNo", sql.Char(8), rollNo)
        .execute("GET_CREDITHR");
      return result.recordset[0].totalCredits;
    } catch (error) {
      console.error("❌ Error fetching current credit hours:", error);
      throw error;
    }
  },  
};

module.exports = studentModel;
