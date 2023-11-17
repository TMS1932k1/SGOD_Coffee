import {View, StyleSheet, StatusBar} from 'react-native';
import {useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import {MyDimensions} from '../../constants';
import {Translation} from 'react-i18next';
import {ContainedButton, HeaderSection, InputSection} from '../../components';
import {Controller, useForm} from 'react-hook-form';
import {regexFormatHelper} from '../../utils';

export default function ForgotPasswordScreen() {
  const theme = useTheme();

  const colors = useMemo(() => theme.colors, [theme]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  // Handle get password by email input
  const onGetPasswordByEmail = handleSubmit(data => {});

  const statusBar = useMemo(
    () => (
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
    ),
    [colors, theme],
  );

  const headerSection = useMemo(
    () => (
      <Translation>
        {t => (
          <HeaderSection
            title={t('forgotPassword')}
            subtitle={t('forgotPasswordSub')}
          />
        )}
      </Translation>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {statusBar}
      {headerSection}
      <View style={styles.inputsContainer}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: regexFormatHelper.regEmail,
          }}
          render={({field: {onChange, value}}) => (
            <Translation>
              {t => (
                <InputSection
                  value={value}
                  error={errors.email ? t('emailInvalid') : undefined}
                  onChangeText={onChange}
                  icon="email"
                  placeholder={t('placeholderEmail')}
                />
              )}
            </Translation>
          )}
        />
      </View>
      <Translation>
        {t => (
          <ContainedButton
            onPress={onGetPasswordByEmail}
            style={styles.continueBtn}>
            {t('continue')}
          </ContainedButton>
        )}
      </Translation>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MyDimensions.paddingLarge,
    paddingBottom: MyDimensions.paddingLarge,
  },
  inputsContainer: {
    flex: 1,
    marginTop: MyDimensions.paddingLarge,
  },
  continueBtn: {
    marginTop: MyDimensions.paddingLarge,
  },
});
