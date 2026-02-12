import { useState } from 'react';
import Button from './components/Button/Button';
import Card from './components/Card/Card';
import Modal from './components/Modal/Modal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="mainTitle">React Components Library</h1>
        <p className="subtitle">
          A professional collection of reusable React components with clean architecture
        </p>
      </header>

      {/* Main Content */}
      <main className="main">
        {/* Button Component Section */}
        <section className="section">
          <h2 className="sectionTitle">Button Component</h2>
          <p className="sectionDescription">
            Versatile button component with multiple variants, sizes, and states
          </p>

          <div className="componentGrid">
            <div className="componentDemo">
              <h3 className="demoTitle">Variants</h3>
              <div className="buttonGroup">
                <Button variant="primary" onClick={handleButtonClick}>
                  Primary Button
                </Button>
                <Button variant="secondary" onClick={handleButtonClick}>
                  Secondary Button
                </Button>
                <Button variant="outline" onClick={handleButtonClick}>
                  Outline Button
                </Button>
              </div>
            </div>

            <div className="componentDemo">
              <h3 className="demoTitle">Sizes</h3>
              <div className="buttonGroup">
                <Button size="small" onClick={handleButtonClick}>
                  Small
                </Button>
                <Button size="medium" onClick={handleButtonClick}>
                  Medium
                </Button>
                <Button size="large" onClick={handleButtonClick}>
                  Large
                </Button>
              </div>
            </div>

            <div className="componentDemo">
              <h3 className="demoTitle">Disabled State</h3>
              <div className="buttonGroup">
                <Button variant="primary" disabled>
                  Disabled Primary
                </Button>
                <Button variant="secondary" disabled>
                  Disabled Secondary
                </Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Card Component Section */}
        <section className="section">
          <h2 className="sectionTitle">Card Component</h2>
          <p className="sectionDescription">
            Flexible card component with optional image, title, description, and children support
          </p>

          <div className="cardGrid">
            <Card
              title="Beautiful Landscape"
              description="Experience the serene beauty of nature with this stunning landscape photography."
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
            >
              <Button variant="primary" size="small" onClick={handleButtonClick}>
                Learn More
              </Button>
            </Card>

            <Card
              title="Modern Architecture"
              description="Explore contemporary design and innovative architectural solutions."
              image="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80"
            >
              <Button variant="secondary" size="small" onClick={handleButtonClick}>
                View Gallery
              </Button>
            </Card>

            <Card
              title="Card Without Image"
              description="This card demonstrates the flexibility of the component when used without an image. Perfect for text-heavy content."
            >
              <div className="cardActions">
                <Button variant="outline" size="small" onClick={handleButtonClick}>
                  Action 1
                </Button>
                <Button variant="outline" size="small" onClick={handleButtonClick}>
                  Action 2
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Modal Component Section */}
        <section className="section">
          <h2 className="sectionTitle">Modal Component</h2>
          <p className="sectionDescription">
            Controlled modal with smooth transitions, overlay click handling, and accessibility features
          </p>

          <div className="buttonGroup">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
            >
              Open Basic Modal
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsSecondModalOpen(true)}
            >
              Open Modal with Form
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Built with React, Vite, and CSS Modules</p>
        <p>© 2024 React Components Library</p>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome to the Modal"
      >
        <div className="modalContent">
          <p>
            This is a beautiful modal component with smooth animations and transitions.
            You can close it by clicking the X button, pressing ESC, or clicking outside the modal.
          </p>
          <p>
            The modal prevents body scroll and includes accessibility features like
            keyboard navigation and proper ARIA attributes.
          </p>
          <div className="modalActions">
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Got it!
            </Button>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isSecondModalOpen}
        onClose={() => setIsSecondModalOpen(false)}
        title="Contact Form Example"
      >
        <div className="modalContent">
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="formGroup">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="input"
                placeholder="Enter your name"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="input"
                placeholder="Enter your email"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="textarea"
                rows="4"
                placeholder="Enter your message"
              />
            </div>
            <div className="modalActions">
              <Button variant="primary" type="submit">
                Send Message
              </Button>
              <Button variant="outline" onClick={() => setIsSecondModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
