module.exports = {
     apps: [
          {
               name: "feno-back-end",
               script: "./src/main.ts",
               instances: 2,
               autorestart: true,
               watch: false,
               max_memory_restart: "2G",
               env: {
                    NODE_ENV: "development",
               },
               env_production: {
                    NODE_ENV: "production",
               },
          },
     ],

     deploy: {
          production: {
               user: 'SSH_USERNAME',
               host: 'SSH_HOSTMACHINE',
               ref: 'origin/master',
               repo: 'GIT_REPOSITORY',
               path: 'DESTINATION_PATH',
               'pre-deploy-local': '',
               'post-deploy': 'npm install && pm2 reload ecosystem.config.cjs --env production',
               'pre-setup': ''
          }
     }
};