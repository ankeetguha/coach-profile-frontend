<template>
  <footer>
    <div class="footer-info">
      <span>Powered by</span>
      <router-link to="https://dashboard.skipperfit.com/sign-up"
        ><img
          src="@/assets/images/logo.png"
          class="footer-logo"
          alt="Skipper Logo"
        />
      </router-link>
      <div class="disclaimer">
        <div class="india-love">
          <h3>
            Made with
            <img
              src="@/assets/images/icons/heart.png"
              class="heart"
              alt="Skipper Love"
            />
            by Skipper
          </h3>
        </div>

        <div class="policies-wrapper">
          <router-link
            v-for="(policy, index) in policies"
            :key="index"
            class="policy-link"
            :to="`/${!$store.state.isSubDomain ? coach.slug + '/' : ''}${
              policy.url
            }`"
            >{{ policy.title }}
          </router-link>
        </div>

        &copy; 2021 AGZ Technologies Private Limited. All Rights Reserved.
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "SiteFooter",
  data() {
    return {
      policies: {},
      policyMap: {
        privacyPolicy: {
          url: "privacy-policy",
          title: "Privacy Policy",
        },
        termsOfUse: {
          url: "terms-of-use",
          title: "Terms Of Use",
        },
        cancellationPolicy: {
          url: "cancellation-policy",
          title: "Cancellation Policy",
        },
      },
    };
  },
  props: {
    coach: Object,
  },
  created() {
    this.initPolicies();
  },
  methods: {
    initPolicies() {
      for (var policy in this.coach.policies) {
        if (this.coach.policies[policy] != null) {
          this.policies[policy] = this.policyMap[policy];
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
footer {
  text-align: center;
  z-index: -1;
  bottom: 0;
  left: 0;
  width: calc(100% - 3rem);
  padding: 2.5rem 1.5rem 2rem;

  &.extended-footer {
    padding-bottom: 6rem;
  }
}

.footer-logo {
  display: block;
  margin: 1.5rem auto 0.75rem;
  width: 6.5rem;
}

span,
.disclaimer {
  display: block;
  font-size: $smallestFontSize;
  text-align: center;
  margin-top: 3px;
  color: darken($whiteColor, 40%);
}

span {
  font-size: 10px;
  margin-bottom: -1rem;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
}

.india-love {
  text-align: center;
}

.india-love h3 {
  font-weight: $normalFontWeight;
  font-size: $normalFontSize;
  color: darken($whiteColor, 15%);
}

.heart {
  width: 1rem;
  margin-right: 0.3rem;
  margin-left: 0.1rem;
  animation: heartbeat 1s infinite;
  transform-origin: center;
}

.policy-link-wrapper {
  padding-bottom: 1.5rem;
  margin: 0 1rem 1rem;
  border-bottom: 1px solid #4a4a4a;
}
.policy-link {
  display: inline-block;
  font-size: $smallFontSize;
  color: $whiteColor;
  opacity: $lightOpacity;
  text-decoration: none;
  margin: 0 0.5rem;
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.1);
  }

  50% {
    transform: scale(1);
  }

  60% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.policies-wrapper {
  margin: 0.75rem 0;

  a {
    border: none;
  }
}

//Light Theme styles
.light-theme {
  footer {
    background: #272727;
  }

  // .india-love h3 {
  //   color: lighten($blackColor, 30%);
  // }
}

@media screen and (min-width: $mobileWidth) {
  footer {
    &.extended-footer {
      padding-bottom: 3rem;
    }
  }
}
</style>