'use strict';

import { Next } from 'koa';

import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const TenantSchema = new Schema({
    tenant_entity: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    tenant_account: {
        type: String,
    },
    tenant_password: {
        type: String,
    },
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

TenantSchema.pre('save', function(next: Next) {
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


const TenantModel = mongoose.model('Tenant', TenantSchema);

module.exports = TenantModel;