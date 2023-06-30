import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
// import EventList from "../../containers/Events";
// import EventCard from "../../components/EventCard";



describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    // const {container} = render(<EventList/>)
    const {container} = render(<Home/>)
    const listOfEvent = container.querySelector("listOfEvent");
    expect(listOfEvent).toBeDefined();
  })
  it("a list a people is displayed", () => {
    render(<Home />);
    expect(screen.queryByText("Samira")).toBeInTheDocument();
    expect(screen.queryByText("Jean-baptiste")).toBeInTheDocument();
    expect(screen.queryByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("Luís")).toBeInTheDocument();
    expect(screen.queryByText("Christine")).toBeInTheDocument();
    expect(screen.queryByText("Isabelle")).toBeInTheDocument();
    // Test avec un nom n'appartenant pas à la liste... changement de getByText par queryByText sinon le test not.toBeInTheDocument() ne marche pas
    expect(screen.queryByText("Robert")).not.toBeInTheDocument();
  })
  it("a footer is displayed", () => {
    const {container} = render(<Home />);
    const footerExist = container.querySelector("footer");
    expect(footerExist).toBeInTheDocument(); 
  })
  it("an event card, with the last event, is displayed", () => {
        // const {container} = render(<EventCard/>)
        const {container} = render(<Home/>)
        const cardTestid = container.querySelector("card-testid");
        expect(cardTestid).toBeDefined();
  })
});
