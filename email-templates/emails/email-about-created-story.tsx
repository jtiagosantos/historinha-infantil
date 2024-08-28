import * as React from 'react';
import { Body, Container, Font, Html, Link, Row, Tailwind, Text } from "@react-email/components";

const Email = () => {
  return (
    <Tailwind>
      <Html lang="pt-br">
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
        <Body className="bg-[#ece3d4] py-10 px-5" style={{ fontFamily: 'Roboto' }}>
          <Container
            className="max-w-[476px] w-full bg-[#e6d5bc] rounded-[6px] p-6"
            style={{ border: '1px solid #c7a26b' }}
          >
            <Text className="text-[#4a381c] text-[20px] font-bold leading-none m-0 mb-5">
              Olá usuário :)
            </Text>
            <Text className="text-[#5c4523] text-base leading-none m-0 mb-3">A sua historinha personalizada foi criada com sucesso!</Text>
            <Text className="text-[#5c4523] text-base leading-5 m-0">Clique no botão abaixo para ter acesso completo à sua história.</Text>
            <Link
              href="http://link-da-historia"
              className="block mt-8 bg-[#ece3d4] text-[#5c4523] py-3 px-8 max-w-[300px] text-center rounded-[6px] w-fit mx-auto"
              style={{ border: '1px solid #c7a26b' }}
            >
              Acessar história
            </Link>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default Email;