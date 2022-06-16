import Head from "next/head";
import { GetServerSideProps } from "next";
import { getProviders, signIn, useSession, getSession } from "next-auth/react";
import type { Session } from "next-auth";

interface providerForm {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}
interface ProviderProps {
  providers: {
    kakao: providerForm;
    google: providerForm;
    naver: providerForm;
  };
}

function Login({ providers }: ProviderProps) {
  return (
    <div
      className="relative flex h-screen w-screen flex-col  items-center
    justify-center bg-transparent
    "
    >
      <Head>
        <title>Resume-login</title>
        <link rel="icon" href="/resumeIcon.ico" />
      </Head>
      <img
        src="./resume.png"
        alt="Logo"
        width={60}
        height={60}
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
      />
      <div className="flex space-x-2">
        {Object?.values(providers)?.map((provider) => (
          <div key={provider.name}>
            <button
              className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5
            transition-all hover:border-2"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;

export const getServerSideProps: GetServerSideProps<{
  session: Session | null;
}> = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);
  console.log(providers);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      providers,
      session,
    },
  };
};
