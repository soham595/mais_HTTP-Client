import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message) => {
  toast(message);
}

export const notifySuccess = (successMessage) => {
  toast.success(successMessage, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
}

export const notifyError = (message) => {
  toast.error(message, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
}

export const notifyWarn = (message) => {
  toast.warn(message, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
}

export const notifyInfo = (message) => {
  toast.info(message, { position: toast.POSITION.TOP_CENTER, autoClose: 3000 });
}
