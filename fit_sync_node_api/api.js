const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Workout = require("../models/Workout");
const Diet = require("../models/Diet");
