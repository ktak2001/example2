import { Suspense, ReactNode, FC } from "react";
import { useFlashSession } from "@shopify/hydrogen/foundation/useSession/useSession";
import { Header } from "./Header.client";
import { Footer } from "./Footer.client";
import { Toast } from "./Toast.client";
import { Container } from "./Container.client";
import { SessionKey } from "../../constants/SessionKey";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  const error = useFlashSession(SessionKey.DisplayError);

  return (
    <Container>
      <Header />
      <main className="flex-grow">
        {error && <Toast text={error} key={new Date().getMilliseconds()} />}
        <Suspense>{children}</Suspense>
      </main>
      <Footer />
    </Container>
  );
};
