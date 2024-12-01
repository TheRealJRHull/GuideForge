# **GuideForge**  
*An Open-Source CMS for DIY Guides and Manuals*

GuideForge is a powerful, user-friendly content management system (CMS) designed to help users create, organize, and share DIY guides, manuals, and other instructional content. Built using **Vue 3**, **Firebase**, and **Bootstrap 5**, GuideForge supports Markdown-based document editing, secure media hosting via Imgur, and a clean, modern user interface. 

This project is open-source, and you can follow along with my development journey as I build it with AI as my development team. All code, features, and improvements will be documented openly for others to learn from, contribute to, and improve.

---

## **Features**

- **Markdown Editor**: Create and edit documents using Markdown, with a live preview.
- **Media Management**: Upload images and embed them into your documents via **Imgur** API integration.
- **Role-Based Access**: Admins, editors, and viewers with permissions-based access.
- **Document Organization**: Categorize and tag documents for easy management and search.
- **Version Control**: Maintain and revert document versions.
- **Search & Filter**: Full-text search and category/tag-based filtering.
- **Responsive Design**: Mobile-first UI, optimized for all devices.
- **Open Source**: Contribute and help improve GuideForge.

---

## **Project Setup**

### **Prerequisites**
- **Node.js** (>= v16.0.0)
- **Vue CLI**: For local development setup.
- **Firebase** account: For backend and hosting.

### **Getting Started**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/GuideForge.git
   ```

2. **Install dependencies**:
   Navigate into the project folder and run:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Create a Firebase project if you don't have one: [Firebase Console](https://console.firebase.google.com/).
   - Add Firebase credentials to your project (details in `.env` file).

4. **Run the app locally**:
   ```bash
   npm run serve
   ```

   This will start the local development server, usually accessible at `http://localhost:8080`.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## **Usage**

### **Creating Documents**  
- Documents are created in the **Markdown editor**.
- Embed images by uploading them via Imgur. Copy the Imgur URL and paste it into the editor using Markdown syntax:  
  ```markdown
  ![Image Description](https://imgur.com/your-image-url)
  ```

### **Role-Based Access**  
- **Admins**: Full access to all features (create/edit/publish, manage users).
- **Editors**: Can create and edit documents.
- **Viewers**: Can view published documents only.

---

## **AI Development Journey**

This project is being developed with the help of **AI** as a development assistant. Throughout the process, I will document how AI contributes to problem-solving, feature planning, and coding tasks. You can follow the journey on GitHub Discussions or [read about it here](docs/ai-journey.md).

---

## **Contributing**

GuideForge is an open-source project, and contributions are welcome!

### **How to Contribute**
1. **Fork the repository**.
2. **Create a new branch**:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make changes**:  
   Add your feature or fix a bug.
4. **Commit your changes**:
   ```bash
   git commit -m "Add feature X"
   ```
5. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a pull request** to the main branch.

### **Code of Conduct**  
Please follow the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md) when interacting with the community.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- **Vue 3**: For building the frontend framework.
- **Firebase**: For providing scalable backend solutions.
- **Bootstrap 5**: For the beautiful, responsive UI components.
- **Imgur API**: For hosting and managing media content.
- **DOMPurify**: For sanitizing the Markdown content.

---

Feel free to suggest additional features or improvements in the **Discussions** tab, and check out the **Issues** section for open tasks!
