import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
  username: string;
  resetLink: string;
}

const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  username = "User",
  resetLink = "https://example.com/reset-password",
}) => (
  <Html>
    <Head />
    <Font
      fontFamily="Inter"
      fallbackFontFamily={"sans-serif"}
      webFont={{
        url: "https://fonts.gstatic.com/s/inter/v18/UcCo3FwrK3iLTcviYwY.woff2",
        format: "woff2",
      }}
      fontWeight={400}
      fontStyle="normal"
    />
    <Preview>Reset your password</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans px-2">
        <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
          <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
            Reset Your Password
          </Heading>
          <Text className="text-black text-[14px] leading-[24px]">
            Hello {username},
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            We received a request to reset your password. Click the button below
            to create a new password. If you didn't make this request, you can
            safely ignore this email.
          </Text>

          <Section className="text-center mt-[32px] mb-[32px]">
            <Button
              className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
              href={resetLink}
            >
              Reset Password
            </Button>
          </Section>
          <Text className="text-black text-[14px] leading-[24px]">
            Or copy and paste this URL into your browser:{" "}
            <Link href={resetLink} className="text-blue-600 no-underline">
              {resetLink}
            </Link>
          </Text>
          <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          <Text className="text-[#666666] text-[12px] leading-[24px]">
            For security, this link expires in 24 hours. If you need assistance,
            please contact our support team.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default ResetPasswordEmail;
