import handlebars from 'handlebars';

export const compileEmailTemplate = <T = Record<string, unknown>>(
  emailTemplate: string,
  variables: T,
) => {
  const template = handlebars.compile(emailTemplate);
  const html = template(variables);

  return html;
};
