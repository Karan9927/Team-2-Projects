let templateChanged = false;
const resumeData = {
  image: [],
  education: [],
  experience: [],
  projects: [],
  certifications: [],
  awards: [],
};
console.log(resumeData);

function displayImage() {
  const dpInput = document.getElementById("dp");
  const dpFile = dpInput.files[0];

  if (dpFile) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const dpUrl = e.target.result;
      const imageInfo = {
        dpUrl,
      };

      resumeData.image.push(imageInfo);
      generateResume();
    };

    reader.readAsDataURL(dpFile);
  }
}

function addAwards() {
  const additional = document.getElementById("additional").value;
  const additionalinfo = {
    additional,
  };
  resumeData.awards.push(additionalinfo);
  document.getElementById("additional").value = "";

  generateResume();
}

function addEducation() {
  const Instname = document.getElementById("Instname").value;
  const Instlocation = document.getElementById("Instlocation").value;
  const Instdegree = document.getElementById("Instdegree").value;
  const Instfield = document.getElementById("Instfield").value;
  const Inststart = document.getElementById("Inststart").value;
  const Instend = document.getElementById("Instend").value;
  const Instscore = document.getElementById("Instscore").value;

  const educationinfo = {
    Instname,
    Instlocation,
    Instdegree,
    Instfield,
    Inststart,
    Instend,
    Instscore,
  };
  resumeData.education.push(educationinfo);

  document.getElementById("Instname").value = "";
  document.getElementById("Instlocation").value = "";
  document.getElementById("Instdegree").value = "";
  document.getElementById("Instfield").value = "";
  document.getElementById("Inststart").value = "";
  document.getElementById("Instend").value = "";
  document.getElementById("Instscore").value = "";

  generateResume();
}

function addExperience() {
  const expname = document.getElementById("expname").value;
  const exppost = document.getElementById("exppost").value;
  const expstart = document.getElementById("expstart").value;
  const expend = document.getElementById("expend").value;
  const explocation = document.getElementById("explocation").value;
  const expdesc = document.getElementById("expdesc").value;

  const experienceinfo = {
    expname,
    exppost,
    expstart,
    expend,
    explocation,
    expdesc,
  };

  resumeData.experience.push(experienceinfo);

  document.getElementById("expname").value = "";
  document.getElementById("exppost").value = "";
  document.getElementById("expstart").value = "";
  document.getElementById("expend").value = "";
  document.getElementById("explocation").value = "";
  document.getElementById("expdesc").value = "";
  generateResume();
}

function addProjects() {
  const projecttitle = document.getElementById("projecttitle").value;
  const projecttech = document.getElementById("projecttech").value;
  const projectlink = document.getElementById("projectlink").value;
  const projectdesc = document.getElementById("projectdesc").value;

  const projectinfo = {
    projecttitle,
    projecttech,
    projectlink,
    projectdesc,
  };

  resumeData.projects.push(projectinfo);

  document.getElementById("projecttitle").value = "";
  document.getElementById("projecttech").value = "";
  document.getElementById("projectlink").value = "";
  document.getElementById("projectdesc").value = "";

  generateResume();
}

function addCertification() {
  const certificatename = document.getElementById("certificatename").value;
  const certificatelink = document.getElementById("certificatelink").value;
  const certificateissued = document.getElementById("certificateissued").value;

  const certificationinfo = {
    certificatename,
    certificatelink,
    certificateissued,
  };

  resumeData.certifications.push(certificationinfo);

  document.getElementById("certificatename").value = "";
  document.getElementById("certificatelink").value = "";
  document.getElementById("certificateissued").value = "";
  generateResume();
}
const educationContainer = document.getElementById("preview-education");

function generateResume() {
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const tel = document.getElementById("tel").value;
  const address = document.getElementById("address").value;
  const jobtitle = document.getElementById("job-title").value;
  const formattedTel = tel ? formatText(tel) : "";
  const formattedAddress = address ? formatText(address) : "";

  const personalInfoContent = `
  <div class="preview-personal-container">
    <div class="preview-personal">
      <p class="preview-name">${firstname} ${lastname}</p>
      <p class="preview-jobtitle">${jobtitle}</p>
      <p class="main-info">${email} ${formattedTel} ${formattedAddress}</p>
    </div>
    <div>
    <img class="preview-image" src="${
      resumeData.image.length > 0 ? resumeData.image[0].dpUrl : ""
    }" alt="Profile Image">
    </div>
    </div>
    <hr id="line"/>
  `;

  const educationContent = `
    <div class="preview-education">
      <p class="preview-headings">Education</p>
      <hr id="lines"/>
      ${generateEducationSection()}
      ${resumeData.education.map((edu) => generateEducationEntry(edu)).join("")}
    </div>
  `;

  const experienceContent = `
    <div class="preview-experience">
      <p class="preview-headings">Experience</p>
      <hr id="lines"/>
      ${generateExperienceSection()}
      ${resumeData.experience
        .map((exp) => generateExperienceEntry(exp))
        .join("")}
    </div>
  `;

  const skillsContent = `
    <div class="preview-skills">
      <p class="preview-headings">Skills</p>
      <hr id="lines"/>

      ${generateSkillsSection()}
    </div>
  `;

  const projectsContent = `
    <div class="preview-projects">
      <p class="preview-headings">Projects / Open-Source</p>
      <hr id="lines"/>

      ${generateprojectsSection()}
      ${resumeData.projects
        .map((project) => generateProjectEntry(project))
        .join("")}
    </div>
  `;

  const certificationsContent = `
    <div class="preview-certificate">
      <p class="preview-headings">Certifications</p>
      <hr id="lines"/>

      ${generatecertificateSection()}
      ${resumeData.certifications
        .map((certification) => generateCertificationEntry(certification))
        .join("")}
    </div>

  `;

  const awardContent = `
  <div class="preview-awards">
  <p class="preview-headings">Honors & Awards</p>
  <hr id="lines"/>

  ${generateAwardSection()}
  ${resumeData.awards.map((award) => generateAwardsEntry(award)).join("")}
  </div>
  `;

  const resumeContent =
    personalInfoContent +
    educationContent +
    experienceContent +
    skillsContent +
    projectsContent +
    certificationsContent +
    awardContent;

  document.getElementById("preview").innerHTML = resumeContent;
  if (templateChanged) {
    applyTemplateChanges();
  }
}

function generateEducationEntry(edu) {
  return `
    <div class="preview-containers">
      <div class="containers-left">
        <p class="bold">${edu.Instname}</p>
        <p class="medium">${edu.Instdegree} ${edu.Instfield}</p>
        <p class="light">CGPA: ${edu.Instscore}</p>
      </div>
      <div class="containers-right">
        <p class="startend">${edu.Inststart} - ${edu.Instend}</p>
        <p class="Instlocation">${edu.Instlocation}</p>
      </div>
    </div>
  `;
}

function generateExperienceEntry(exp) {
  return `
    <div class="preview-containers">
      <div class="containers-left">
        <p class="bold">${exp.expname} ${exp.exppost}</p>
        <p class="light">${exp.expdesc}</p>
      </div>
      <div class="containers-right">
        <p class="startend">${exp.expstart} - ${exp.expend}</p>
        <p class="Instlocation">${exp.explocation}</p>
      </div>
    </div>
  `;
}
function generateAwardsEntry(award) {
  return `
  <div class = "preview-containers">
  <div class="containers-right">
  <li class="list">${award.additional}</li>
  </div>
  </div>
  `;
}
function generateAwardSection() {
  const additional = document.getElementById("additional").value;

  return `
  <div class = "preview-containers">
  <div class="containers-right">
  <li class="list">${additional}</li>
  </div>
  </div>
  `;
}

function generateEducationSection() {
  const Instname = document.getElementById("Instname").value;
  const Instlocation = document.getElementById("Instlocation").value;
  const Instdegree = document.getElementById("Instdegree").value;
  const Instfield = document.getElementById("Instfield").value;
  const Inststart = document.getElementById("Inststart").value;
  const Instend = document.getElementById("Instend").value;
  const Instscore = document.getElementById("Instscore").value;

  return `
  <div class="preview-containers">
    <div class="containers-left">
      <p class="bold">${Instname}</p>
      <p class="medium">${Instdegree} ${Instfield}</p>
      <p class="light">CGPA: ${Instscore}</p>
    </div>
    <div class="containers-right">
      <p class="startend">${Inststart} - ${Instend}</p>
      <p class="Instlocation">${Instlocation}</p>
    </div>
  </div>
`;
}

function generateSkillsSection() {
  const language = document.getElementById("language").value;
  const library = document.getElementById("library").value;
  const tools = document.getElementById("tools").value;
  const db = document.getElementById("db").value;

  return `
    <div class="preview-containers">
      <div class="containers-left">
        <p class="medium skills">Programming Languages<span class="lang">${language}</span></p>
        <p class="medium skills">Libraries/Frameworks<span class="lang">${library}</span></p>
        <p class="medium skills">Tools<span class="lang">${tools}</span></p>
        <p class="medium skills">Databases<span class="lang">${db}</span></p>
      </div>
    </div>
  `;
}
function generateExperienceSection() {
  const expname = document.getElementById("expname").value;
  const exppost = document.getElementById("exppost").value;
  const expstart = document.getElementById("expstart").value;
  const expend = document.getElementById("expend").value;
  const explocation = document.getElementById("explocation").value;
  const expdesc = document.getElementById("expdesc").value;

  return `
  <div class="preview-containers">
      <div class="containers-left">
        <p class="bold">${expname} ${exppost}</p>
        <p class="light">${expdesc}</p>
      </div>
      <div class="containers-right">
        <p class="startend">${expstart} - ${expend}</p>
        <p class="Instlocation">${explocation}</p>
      </div>
    </div>
  `;
}

function generatecertificateSection() {
  const certificatename = document.getElementById("certificatename").value;
  const certificatelink = document.getElementById("certificatelink").value;
  const certificateissued = document.getElementById("certificateissued").value;

  return `
  <div class="preview-containers">
    <div class="containers-left">
      <p class="bold certificate">${certificatename} <a class="certificatelink" href="${certificatelink}">${certificateissued}</a></p>
    </div>
  </div>
`;
}

function generateprojectsSection() {
  const projecttitle = document.getElementById("projecttitle").value;
  const projecttech = document.getElementById("projecttech").value;
  const projectlink = document.getElementById("projectlink").value;
  const projectdesc = document.getElementById("projectdesc").value;

  return `
    <div class="preview-containers">
      <div class="containers-left">
        <p class="bold projects">${projecttitle} | <a class="projecta" href="${projectlink}">Link</a></p>
        <p class="light desc">${projectdesc}</p>
      </div>
      <div class="containers-right">
        <p>${projecttech}</p>
      </div>
    </div>
  `;
}

function generateProjectEntry(project) {
  return `
    <div class="preview-containers">
      <div class="containers-left">
        <p class="bold projects">${project.projecttitle} | <a class="projecta" href="${project.projectlink}">Link</a></p>
        <p class="light desc">${project.projectdesc}</p>
      </div>
      <div class="containers-right">
        <p>${project.projecttech}</p>
      </div>
    </div>
  `;
}

function generateCertificationEntry(certification) {
  return `
    <div class="preview-containers">
      <div class="containers-left">
        <p class="bold certificate">${certification.certificatename} <a class="certificatelink" href="${certification.certificatelink}">${certification.certificateissued}</a></p>
      </div>
    </div>
  `;
}

const formInputs = document.querySelectorAll(
  "#resumeForm input, #resumeForm textarea"
);

formInputs.forEach((input) => {
  input.addEventListener("input", generateResume);
});

const formatText = (text) => {
  return "| " + text;
};
function downloadResume() {
  generateResume();
  const element = document.getElementById("preview");

  html2pdf(element);
}
function colorRed() {
  const preview = document.getElementById("preview");
  preview.style.backgroundColor = "#FADBD8";
}
function colorBlue() {
  const preview = document.getElementById("preview");
  preview.style.backgroundColor = "#D4E6F1";
}
function colorGreen() {
  const preview = document.getElementById("preview");
  preview.style.backgroundColor = "#D4EFDF";
}
function colorPurple() {
  const preview = document.getElementById("preview");
  preview.style.backgroundColor = "#F4ECF7";
}
function applyTemplateChanges() {
  const paragraphs = document.querySelectorAll(".right-panel p");
  paragraphs.forEach((p) => {
    p.style.fontFamily = "'Merriweather', serif";
  });

  const headings = document.querySelectorAll(".right-panel .heading");
  headings.forEach((heading) => {
    heading.style.fontFamily = "'Merriweather', serif";
  });

  const lines = document.querySelectorAll("#lines");
  lines.forEach((line) => {
    line.style.display = "block";
  });

  const line = document.getElementById("line");
  line.style.display = "none";
}

function changeTemplate() {
  templateChanged = true;
  generateResume();
}

function revertTemplate() {
  templateChanged = false;
  generateResume();
}
