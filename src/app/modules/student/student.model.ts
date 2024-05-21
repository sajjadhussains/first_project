import { Schema, model, connect } from 'mongoose';
import {Guardian, LocalGuardian, Student, UserName} from './student.interface'

const userSchema = new Schema<UserName>({
        firstName:{
            type:String,
            required:true
        },
        middleName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        }
    },
)

const guardianSchema = new Schema<Guardian>({
    fatherName:{
        type:String,
        required:true
    },
    fatherOccupation:{
        type:String,
        required:true
    },
    fatherContactNumber:{
        type:String,
        required:true
    },
    motherName:{
        type:String,
        required:true
    },
    motherOccupation:{
        type:String,
        required:true
    },
    motherContactNumber:{
        type:String,
        required:true
    }
})
const localGuardianSchema = new Schema<LocalGuardian>({
    name:{type:String,required:true},
    occupation:{type:String,required:true},
    contactNumber:{type:String,required:true}
})
const studentSchema = new Schema<Student>({
    id:{type:String},
    name:userSchema,
    gender:["male","female"],
    dateOfBirth:{type:String},
    email:{type:String,required:true},
    contactNumber:{type:String,required:true},
    emergencyContactNumber:{type:String,required:true},
    bloodGroup:["A+","A-","B+","B-","AB+","AB-","O+", "O-"],
    presentAddress:{type:String,required:true},
    permanentAddress:{type:String,required:true},
    guardian:guardianSchema,
    localGuardian:localGuardianSchema,
    profileImg:{type:String},
    isActive:['active','blocked']
})

export const StudentModel = model<Student>('Student',studentSchema)
