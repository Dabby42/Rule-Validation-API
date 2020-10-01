import autoBind from 'auto-bind';
import Helper from './../helpers/helper';
import User from './../models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
let mongoose = require('mongoose');
let gateman = require('gatemanjs').GateMan(mongoose);

dotenv.config();

class Seed extends Helper {
  constructor() {
    super();
    autoBind(this);
  }

  async seedRole() {
    Promise.all([
      this.createSuperAdminRole(),
      this.createSuperAdmin(),
      this.assignSuperAdminRole(),
    ]);
  }

  createSuperAdmin = async () => {
    const correctUser = {
      firstName: 'Nwafor',
      lastName: 'Dabere',
      email: 'nwafordabere@gmail.com',
    };

    let hashedPassword = bcrypt.hashSync('tomcat', 8);

    let user = new User({ ...correctUser, password: hashedPassword });

    try {
      let hasUser = await User.findOne({
        email: 'nwafordabere@gmail.com',
      });
      if (hasUser) {
        console.log('user exists already');
        return;
      }

      await user.save();
      console.log(user, 'User created');
    } catch (err) {
      console.log(err, 'Could not create user');
    }
  };

  createSuperAdminRole = async () => {
    try {
      let role = await gateman.createRole('superadmin');
      if (role) {
        console.log('SuperAdmin role created');
      }
    } catch (err) {
      console.log(err, 'failed to create role');
    }
  };

  assignSuperAdminRole = async () => {
    try {
      let roleName = 'superadmin';
      let user = await User.findOne({
        email: 'nwafordabere@gmail.com',
      });
      let roles = await gateman.getRoles();

      let role = await user.assign(roleName);
      if (role) {
        if (!user.roles.includes(roleName)) {
          user.roles.push(roleName);
          user.save();
        }
        console.log('Role Assigned');
      }
    } catch (err) {
      console.log(err, 'error occured');
    }
  };
}

module.exports = Seed;
