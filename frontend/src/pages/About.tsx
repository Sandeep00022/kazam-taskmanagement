
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-purple-600 flex items-center justify-center py-10">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-2xl space-y-6">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          About Our Task Management App
        </h1>

        <div className="text-center">
          <p className="text-lg text-gray-800">
            Welcome to our Task Management App! This tool is designed to help
            you organize and manage your daily tasks efficiently.
          </p>
          <p className="mt-4 text-lg text-gray-800">
            With our easy-to-use interface, you can create, edit, and delete
            tasks, ensuring that nothing slips through the cracks. Whether
            you're managing work-related projects or personal goals, our app
            provides you with the features you need to stay on track.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Create, edit, and delete tasks.</li>
            <li>Manage tasks with a simple and intuitive interface.</li>
            <li>Organize tasks in categories (Coming Soon!).</li>
            <li>
              Stay focused with easy-to-access task list and task management
              tools.
            </li>
            <li>Sync across devices (Coming Soon!).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
