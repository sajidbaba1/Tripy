import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20"> {/* Add padding for the fixed navbar */}
        <Hero />
      </main>
    </div>
  );
}

export default App;
