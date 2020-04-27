'use strict';

import { Next } from 'koa';

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const CarportSchema = new Schema({
    carport_type: {
        type: Number,
        required: true,
    },
    occupancy_state: {
        type: Number,
        required: true,
        default: 0,
    },
    parkinglot_id: {
        type: String,
        required: false,
    },
    carport_number: String,
    meta: {
        createAt: {
            type: Date,
            dafault: Date.now(),
        },
        updateAt: {
            type: Date,
            dafault: Date.now(),
        },
    },
});

CarportSchema.pre('save', function(next: Next) {
    if (this.isNew) {
      this.update({meta: {
        createAt: Date.now(),
        updateAt: Date.now(),
      }});
    } else {
      this.update({meta: {
        updateAt: Date.now(),
      }});
    }
    next();
  });


const CarportModel = mongoose.model('Carport', CarportSchema);

module.exports = CarportModel;