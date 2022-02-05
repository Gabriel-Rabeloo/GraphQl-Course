export const createDate = (dateISOString: string): string => {
  let date;
  if (!dateISOString) {
    date = new Date();
  } else {
    date = new Date(dateISOString);
  }

  return date.toLocaleString('pt-BR');
};

export const dateISOtoMySQL = (dateISOString: string): string => {
  const dateArg = createDate(dateISOString);
  const [date, time] = dateArg.split(' ');
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day} ${time}`;
};
