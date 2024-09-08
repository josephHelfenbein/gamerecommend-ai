<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Apache License][license-shield]][license-url]
[![linkedin-shield][linkedin-shield]][LinkedIn-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/josephHelfenbein/gamerecommend-ai">
    <img src="./public/favicon.svg" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">GameRecommend AI</h3>

  <p align="center">
    Get quick game recommendations from AI by just entering a game you liked. 
    <br />
    <br />
    <a href="https://gamerecommend.vercel.app/">Visit</a>
    ·
    <a href="https://github.com/josephHelfenbein/gamerecommend-ai/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/josephHelfenbein/gamerecommend-ai/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About the Project
### What is GameRecommend AI solving?

Finding new videogames to play is exhausting, as it can take a long time to choose a new game to try, only to find out that it isn't your type. Many game recommenders out there utilize filters, and thus can only work if the game is in the database. On top of that, using filters can end up missing many aspects of a game. GameRecommend AI utilizes AI to find similar games to any game you like. 

### How does it work?

The user just enters a game they like in the input field. After pressing "find recommendations", the input is sent to GPT-4o mini using OpenAI API with custom system instructions.

The GPT-4o mini model is given system instructions to find 5 games the user would like if they liked the input game, and reasons why. It's then instructed to return this as JSON with a specific format, and also to not make up games, to use the games' official names, and to give exactly 5 reasons.  

Afterwards, [IGDB API](https://api-docs.igdb.com/) is called to get the cover art. The title of each recommended game is sent in a different call as a search, and it returns the image ID of the cover art. Because there's only 4 API requests per second allowed, and 5 games, the loading is artificially slowed down to allow enough time for all of the images to be called.

The information from OpenAI API and IGDB API are then styled and displayed, along with a simple link to a Google search using the title name.




### Built With

* [![TypeScript][TypeScript]][TypeScript-url]
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Tailwind][Tailwind]][Tailwind]
* [![OpenAI][OpenAI]][OpenAI-url]
* [![IGDB][IGDB]][IGDB-url]

### Powered By

* [![Vercel][Vercel]][Vercel-url]



<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- GETTING STARTED -->
## Getting Started

Here are the steps to run the project locally if you want to develop your own project.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```


### Installation

1. Get an OpenAI API key at [https://openai.com/api](https://openai.com/api)
2. Get an IGDB API key at [https://api-docs.igdb.com](https://api-docs.igdb.com). You need a Twitch account to use the API.
3. Clone the repo
   ```sh
   git clone https://github.com/josephHelfenbein/gamerecommend-ai.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Enter your API keys and database URL in a `.env.local` file
   ```ts
       OPENAI_API_KEY = "ENTER YOUR OPENAI API KEY"
       TWITCH_CLIENT_ID = "ENTER YOUR TWITCH API KEY CLIENT ID"
       TWITCH_CLIENT_SECRET = "ENTER YOUR TWITCH API KEY CLIENT SECRET"
   ```
6. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin josephHelfenbein/gamerecommend-ai
   git remote -v # confirm the changes
   ```
7. You can run the website locally with
    ```sh
    npm run dev
    ```
    or, if hosting on Vercel, with
    ```sh
    vercel dev
    ```








<!-- Acknowledgements -->
## Acknowledgements

Distributed under the Apache 2.0 License. See `LICENSE.txt` for more information.





Project Link: [https://github.com/josephHelfenbein/gamerecommend-ai](https://github.com/josephHelfenbein/gamerecommend-ai)

* [Best README Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/josephHelfenbein/gamerecommend-ai.svg?style=for-the-badge
[contributors-url]: https://github.com/josephHelfenbein/gamerecommend-ai/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/josephHelfenbein/gamerecommend-ai.svg?style=for-the-badge
[forks-url]: https://github.com/josephHelfenbein/gamerecommend-ai/network/members
[stars-shield]: https://img.shields.io/github/stars/josephHelfenbein/gamerecommend-ai.svg?style=for-the-badge
[stars-url]: https://github.com/josephHelfenbein/gamerecommend-ai/stargazers
[issues-shield]: https://img.shields.io/github/issues/josephHelfenbein/gamerecommend-ai.svg?style=for-the-badge
[issues-url]: https://github.com/josephHelfenbein/gamerecommend-ai/issues
[license-shield]: https://img.shields.io/github/license/josephHelfenbein/gamerecommend-ai.svg?style=for-the-badge
[license-url]: https://github.com/josephHelfenbein/gamerecommend-ai/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/joseph-j-helfenbein
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[TypeScript]: https://img.shields.io/badge/typescript-3178C6?logo=typescript&style=for-the-badge&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[OpenAI]: https://img.shields.io/badge/openai%20api-black?logo=openai&style=for-the-badge&logoColor=white
[OpenAI-url]: https://openai.com/api/
[Tailwind]: https://img.shields.io/badge/tailwind%20css-06B6D4?logo=tailwindcss&style=for-the-badge&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[IGDB]: https://img.shields.io/badge/igdb%20api-9147FF?logo=igdb&style=for-the-badge&logoColor=white
[IGDB-url]: https://api-docs.igdb.com/
[Vercel]: https://img.shields.io/badge/vercel-000000?logo=vercel&style=for-the-badge&logoColor=white
[Vercel-url]: https://www.vercel.com/