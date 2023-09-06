import { useContext, useEffect, useState } from "react";
import { SpringContext } from "./App";

export function validate(setState, fieldId, fieldValue, validators) {
  for (const validator of validators) {
    const [valid, errorMessage] = validator(fieldValue);

    if (!valid) {
      setState((prev) => {
        const invalidFields = new Map(prev.invalidFields);
        invalidFields.set(fieldId, errorMessage);
        return { ...prev, invalidFields };
      });
      return;
    }
  }
  setState((prev) => {
    const invalidFields = new Map(prev.invalidFields);
    invalidFields.delete(fieldId);
    return { ...prev, invalidFields };
  });
}

const Fields = {
  Id: "id",
  Nume: "nume",
  Prenume: "prenume",
  Email: "email",
  Parola: "parola",
  ConfirmaParola: "confirmaParola",
  Telefon: "telefon",
};

export function required(value) {
  const valid = !!value;
  return [valid, valid ? "" : "Câmpul este obligatoriu!"];
}

const minThreeLetters = (value) => {
  const valid = value.length >= 3;
  return [valid, valid ? "" : "Câmpul trebuie să aibă minim 3 litere!"];
};

// const emailValidation = (value) => {
//   var mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const valid = value.match(mailFormat);
//   return [
//     valid,
//     valid ? "" : "Câmpul trebuie să fie de tipul exemplu@exemplu.exemplu!",
//   ];
// };

const phoneValidation = (value) => {
  const phoneFormat =
    /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/;
  const valid = value.match(phoneFormat);
  return [valid, valid ? "" : "Formatul telefonului este gresit!"];
};

export function useAccessForm() {
  const { state, setState } = useContext(SpringContext);

  const sameAsPassword = (value) => {
    const valid = value === state.config.parola;
    return [valid, valid ? "" : "Câmpul trebuie să fie la fel ca parola!"];
  };

  useEffect(() => {
    validate(setState, Fields.Email, state.config?.email, [required]);
    validate(setState, Fields.Nume, state.config?.nume, [required]);
    validate(setState, Fields.Prenume, state.config?.prenume, [required]);
    validate(setState, Fields.Parola, state.config?.parola, [required]);
    validate(setState, Fields.ConfirmaParola, state.config?.parola, [required]);
    validate(setState, Fields.Telefon, state.config?.telefon, [required]);
  }, []);

  return {
    [Fields.Email]: {
      value: state.config?.email,
      onChange: (email) => {
        validate(setState, Fields.Email, email, [required]);
        setState((prev) => {
          return { ...prev, config: { ...prev.config, email } };
        });
        console.log(state.invalidFields);
      },
      error: state.invalidFields.get(Fields.Email),
    },
    [Fields.Nume]: {
      value: state.config?.nume,
      onChange: (nume) => {
        validate(setState, Fields.Nume, nume, [required, minThreeLetters]);
        setState((prev) => {
          return { ...prev, config: { ...prev.config, nume } };
        });
      },
      error: state.invalidFields.get(Fields.Nume),
    },
    [Fields.Prenume]: {
      value: state.config?.prenume,
      onChange: (prenume) => {
        validate(setState, Fields.Prenume, prenume, [
          required,
          minThreeLetters,
        ]);
        setState((prev) => {
          return { ...prev, config: { ...prev.config, prenume } };
        });
      },
      error: state.invalidFields.get(Fields.Prenume),
    },
    [Fields.Telefon]: {
      value: state.config?.telefon,
      onChange: (telefon) => {
        validate(setState, Fields.Telefon, telefon, [
          required,
          phoneValidation,
        ]);
        setState((prev) => {
          return { ...prev, config: { ...prev.config, telefon } };
        });
      },
      error: state.invalidFields.get(Fields.Telefon),
    },

    [Fields.Parola]: {
      value: state.config?.parola,
      onChange: (parola) => {
        validate(setState, Fields.Parola, parola, [required]);
        setState((prev) => {
          return { ...prev, config: { ...prev.config, parola } };
        });
      },
      error: state.invalidFields.get(Fields.Parola),
    },

    [Fields.ConfirmaParola]: {
      value: state.config?.confirmaParola,
      onChange: (confirmaParola) => {
        validate(setState, Fields.ConfirmaParola, confirmaParola, [
          required,
          sameAsPassword,
        ]);
        setState((prev) => {
          return { ...prev, config: { ...prev.config, confirmaParola } };
        });
      },
      error: state.invalidFields.get(Fields.ConfirmaParola),
    },
  };
}

export function useLogin() {
  const { state, setState } = useContext(SpringContext);

  useEffect(() => {
    validate(setState, Fields.Email, state.login?.email, [required]);
    validate(setState, Fields.Parola, state.login?.parola, [required]);
  }, []);
  return {
    [Fields.Email]: {
      value: state.config?.email,
      onChange: (email) => {
        validate(setState, Fields.Email, email, [required]);
        setState((prev) => {
          return { ...prev, config: { ...prev.config, email } };
        });
        console.log(state.invalidFields);
      },
      error: state.invalidFields.get(Fields.Email),
    },
    [Fields.Parola]: {
      value: state.config?.parola,
      onChange: (parola) => {
        validate(setState, Fields.Parola, parola, [required]);
        setState((prev) => {
          return { ...prev, config: { ...prev.config, parola } };
        });
      },
      error: state.invalidFields.get(Fields.Parola),
    },
  };
}
