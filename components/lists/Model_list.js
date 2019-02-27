'use strict';

// npm modules
const mongoose = require('mongoose');


// model & export List schema
module.exports = mongoose.model('List', new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'User ID required',
    ref: 'User',
    trim: true
  },
  lastEditedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'User ID required',
    ref: 'User',
    default: this.authorId,
    trim: true
  },
  title: {
    type: String,
    required: 'Title required',
    minlength: [1, 'Title must be min. 1 character'],
    maxlength: [50, 'Title must be max. 50 characters'],
    trim: true
  },
  body: {
    type: String,
    required: 'Why make an empty list? Some text is required',
    minlength: [3, 'List body must contain min. 3 characters'],
    maxlength: [500, 'List body must be max. 500 characters'],
    trim: true
  },
  tags: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.length < 6;
      },
      message: 'Max. 6 tags per list'
    }
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: false
  },
  canView: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  canEdit: {
    type: [mongoose.Schema.Types.ObjectId]
  },
}, {
    timestamps: true
  }));
