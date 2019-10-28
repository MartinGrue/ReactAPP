using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtentions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder;
            ruleBuilder.NotEmpty()
            .MinimumLength(6).WithMessage("Password must be at least 6 character long")
            .Matches("[A-Z]").WithMessage("Password must contain one uppercase letter")
            .Matches("[a-z]").WithMessage("Password msut have at least 1 lowercase character")
            .Matches("[0-9]").WithMessage("Password must contain a number")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password can not contain non alphanumeric");

            return options;
        }
    }
}