/* eslint-disable no-useless-escape */
import {
  required,
  minLength,
  email,
  maxLength,
  requiredIf
} from "vuelidate/lib/validators";

export const requiredValidation = {
  required
};

export const phoneValidation = {
  required: requiredIf(obj => {
    return obj.id === 1;
  }),
  phoneNumberValidation(value: string, obj: any): boolean {
    if (obj.id !== 1 && !value) {
      return true;
    }

    return /^[\+]?\d{2,}?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im.test(
      value
    );
  }
};

export const emailValidation = {
  required: requiredIf(obj => {
    return obj.id === 1;
  }),
  minLength: minLength(3),
  email
};

export const passwordValidation = {
  required
};

export const areaSearchValidation = {
  required
};

export const commentValidation = {
  maxLength(value: any) {
    maxLength(value);
  }
};

export const kanjiValidation = {
  required,
  kanjiValidation(value: string): boolean {
    return /^[一-龥]+$/im.test(value);
  }
};

export const hiraganaValidation = {
  required,
  hiraganaValidation(value: string): boolean {
    return /^[ぁ-ん]+$/im.test(value);
  }
};

export const japanLangValidation = {
  required,
  japanLangValidation(value: string): boolean {
    return (
      /^[一-龥]+$/im.test(value) ||
      /^[ぁ-ん]+$/im.test(value) ||
      /^[ァ-ン]+$/im.test(value)
    );
  }
};

export const englishValidation = {
  required,
  englishValidation(value: string): boolean {
    return /^[a-zA-Z ]+$/im.test(value);
  }
};
